import React, { Dispatch, SetStateAction } from "react";
import "./styles.css";

interface formData {
  name: string;
  age: number;
  email: string;
  interest: string[];
  theme: string;
}

interface ICommonProps {
  data: formData;
  onChange: Dispatch<SetStateAction<formData>>;
  error: boolean;
}

const Profile: React.FC<ICommonProps> = ({ data, onChange, error }) => {
  const { name, age, email } = data;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    onChange((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={onChangeHandler}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />
      </div>
      {error && <div className="error">Data is incorrect!!</div>}
    </div>
  );
};

const Interest: React.FC<ICommonProps> = ({ data, onChange, error }) => {
  const { interest } = data;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    onChange((prev) => {
      return {
        ...prev,
        interest: checked
          ? [...prev.interest, name]
          : interest.filter((int) => int !== name),
      };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interest.includes("coding")}
            onChange={onChangeHandler}
          />
          coding
        </label>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interest.includes("music")}
            onChange={onChangeHandler}
          />
          music
        </label>
      </div>
      {error && <div className="error">Data is incorrect!!</div>}
    </div>
  );
};

const Settings: React.FC<ICommonProps> = ({ data, onChange, error }) => {
  const { theme } = data;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    onChange((prev) => {
      return {
        ...prev,
        theme: name,
      };
    });
  };
  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="dark"
            checked={theme === "dark"}
            onChange={onChangeHandler}
          />
          dark
        </label>
        <label>
          <input
            type="radio"
            name="light"
            checked={theme === "light"}
            onChange={onChangeHandler}
          />
          light
        </label>
      </div>
      {error && <div className="error">Data is incorrect!!</div>}
    </div>
  );
};

const TabsForm = () => {
  const [data, setData] = React.useState<formData>({
    name: "Juned",
    age: 18,
    email: "junedkhan933@gmail.com",
    interest: ["coding"],
    theme: "dark",
  });

  const [activeTab, setActiveTab] = React.useState<number>(0);

  const [errors, setErrors] = React.useState<Record<string, boolean>>({
    ["Profile"]: false,
    ["Interest"]: false,
    ["Settings"]: false,
  });

  const tabsConfig = [
    {
      name: "Profile",
      component: Profile,
      isError: ({ name = "", age = 0, email = "" }: Partial<formData>) => {
        if (name?.length < 2 || age < 18 || email?.length < 5) {
          return true;
        }

        return false;
      },
    },
    {
      name: "Interest",
      component: Interest,
      isError: ({ interest = [] }: Partial<formData>) => {
        if (interest?.length < 1) {
          return true;
        }

        return false;
      },
    },
    {
      name: "Settings",
      component: Settings,
      isError: ({ interest = [] }: Partial<formData>) => {
        return false;
      },
    },
  ];

  const onChangeActiveTab = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setActiveTab(index);
  };

  const onNextClick = () => {
    if (tabsConfig[activeTab].isError(data)) {
      setErrors((prev) => ({
        ...prev,
        [tabsConfig[activeTab].name]: true,
      }));
      return;
    }
    setActiveTab((prev) => prev + 1);
  };

  const onPrevClick = () => {
    setActiveTab((prev) => prev - 1);
  };

  const onSubmit = () => {
    console.log(data);
  };

  const ActiveComponent = tabsConfig[activeTab].component;
  return (
    <div>
      <div className="tabs-header">
        {tabsConfig.map((tab, index) => {
          return (
            <div
              className="tab"
              data-index={index}
              onClick={(e) => onChangeActiveTab(e, index)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <section className="body-section">
        <ActiveComponent
          data={data}
          onChange={setData}
          error={errors[tabsConfig[activeTab].name]}
        />
      </section>
      <div>
        {activeTab >= 1 && <button onClick={onPrevClick}>Prev</button>}
        {activeTab < tabsConfig.length - 1 && (
          <button onClick={onNextClick}>Next</button>
        )}
        {activeTab === tabsConfig.length - 1 && (
          <button onClick={onSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <TabsForm />
    </div>
  );
}
