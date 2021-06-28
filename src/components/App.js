import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstance";

function App() {
  /*
   * authService.currentUser로는 실제 로그인 여부를 알 수 없기 때문에
   * firebase의 onAuthStateChanged 메소드를 통해 상태를 변경
   */
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = async () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    /* or
      Object.assign(old, new); => old Object를 new Object로 update
      setUserObj(Object.assign({}, user));
    */
  };

  useEffect(() => {
    /*
			firebase가 로드 되거나, 로그인/회원가입 등의 상태 변화가 있을 시 호출됨
			회원가입시에도 로그인이 이루어지기 때문에 user가 생성되는데, 이 때 isLoggedIn을 true로 변경함
		*/
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      // firebase load가 완료됨
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
