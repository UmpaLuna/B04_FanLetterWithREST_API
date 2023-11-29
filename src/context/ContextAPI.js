import { createContext, useContext, useState } from "react";
import uuid from "react-uuid";
import theme from "../styledComponents/theme/theme";

// LocalDataContextAPI

const LocalDataValueContext = createContext();
const LocalDataActionsContext = createContext();

export function LocalDataProvider({ children }) {
  const [lists, setLists] = useState({});
  // theme.character는 공통적으로 계속 쓰다보니 쩔수없이...
  const characters = theme.character;
  const actionsWithData = {
    utility: {
      initialSetValue(data) {
        setLists(data);
      },
      usefindDataIndex(param) {
        console.log(param);
        return lists[param.member].findIndex(
          (target) => target.id === param.id
        );
      },
      setLocalStorageData() {
        localStorage.setItem("Tooniverse", JSON.stringify(lists));
      },
    },
    HandleEdit: {
      useUpdateLists(Ref) {
        const letter = {
          id: uuid(),
          name: Ref.name.value,
          text: Ref.text.value,
          date: new Date().toString(),
          target: Ref.target.value,
        };

        lists[Ref.target.value].unshift(letter);
        setLists({ ...lists });
        actionsWithData.utility.setLocalStorageData();
        Ref.name.value = "";
        Ref.text.value = "";
      },
      useUpdateComment(Ref, params) {
        if (Ref.current.defaultValue === Ref.current.value)
          return alert("수정안됨");
        const targetIndex = actionsWithData.utility.usefindDataIndex(params);

        lists[params.member][targetIndex].text = Ref.current.value;
        setLists((prev) => ({ ...prev }));
      },
      useRemoveComment(params) {
        console.log(params);
        const targetIndex = actionsWithData.utility.usefindDataIndex(params);
        lists[params.member].splice(targetIndex, 1);

        setLists((prev) => ({ ...prev }));

        actionsWithData.utility.setLocalStorageData();
      },
    },
    filteringMember(member, id) {
      return lists[member].filter((target) => target.id === id);
    },
  };
  return (
    <LocalDataValueContext.Provider value={{ lists, characters: characters }}>
      <LocalDataActionsContext.Provider value={actionsWithData}>
        {children}
      </LocalDataActionsContext.Provider>
    </LocalDataValueContext.Provider>
  );
}

export function useCustomDataValue() {
  try {
    const value = useContext(LocalDataValueContext);
    if (value === undefined) {
      throw new Error("Please being used within LocalDataValueContext");
    }
    return value;
  } catch (e) {
    alert(e);
  }
}

export function useCustomDataActions() {
  try {
    const value = useContext(LocalDataActionsContext);
    if (value === undefined) {
      throw new Error("please being used within LocalDataActionsContext");
    }
    return value;
  } catch (e) {
    alert(e);
  }
}

// tabCustomContextAPI

const TabValueContext = createContext();
const TabActionsContext = createContext();
export function TabContextProvider(props) {
  const [tab, setTab] = useState(0);
  const tabActions = {
    changeTab(arg) {
      setTab(arg);
    },
    eventChangeTab(e) {
      setTab(e.target.value);
    },
  };

  return (
    <TabActionsContext.Provider value={tabActions}>
      <TabValueContext.Provider value={tab}>
        {props.children}
      </TabValueContext.Provider>
    </TabActionsContext.Provider>
  );
}

export function useCustomTabValueContext() {
  try {
    const value = useContext(TabValueContext);
    if (value === undefined) {
      throw new Error("Please being used within TabValueContext");
    }
    return value;
  } catch (e) {
    alert(e);
  }
}

export function useCustomTabActionsContext() {
  try {
    const value = useContext(TabActionsContext);
    if (value === undefined) {
      throw new Error("Please being used within TabActionsContext");
    }
    return value;
  } catch (e) {
    alert(e);
  }
}
