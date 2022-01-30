import React from "react";
import { action, observable, makeObservable, makeAutoObservable } from "mobx";
import { inject, observer, Provider } from "mobx-react";

class MyStore {
  @observable number = 0;

  constructor() {
    // both the two usage could works well
    // makeObservable(this, {
    //   number: observable,
    //   add: action,
    // });
    makeAutoObservable(this);
  }

  @action
  add() {
    this.number++;
  }
}

const myStore = new MyStore();

@observer
class ButtonComponent extends React.Component<{ myStore: MyStore }> {
  render() {
    const { myStore } = this.props;
    return (
      <React.Fragment>
        <h1>this is MobxHello</h1>
        <p>number is: {myStore.number}</p>
        <button
          onClick={() => {
            myStore.add();
          }}
        >
          Clich to add number
        </button>
      </React.Fragment>
    );
  }
}

class MobxHelloApp extends React.Component {
  render() {
    console.log("MobxHelloApp props", this.props);
    return <ButtonComponent myStore={myStore} />;
  }
}

export default MobxHelloApp;
