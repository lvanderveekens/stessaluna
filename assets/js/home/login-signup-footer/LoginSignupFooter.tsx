import React, {FC, useEffect, useRef} from "react"
import styles from "./LoginSignupFooter.scss?module"
import Button from "../../button/Button";
import { useHistory } from "react-router-dom"

interface Props {
}

const LoginSignupFooter: FC<Props> = ({}) => {
  const history = useHistory()
  const loginSignupFooterRef = useRef(null)

  useEffect(() => {
    document.body.style.paddingBottom = `${loginSignupFooterRef.current.clientHeight}px`
    return () => {
      document.body.style.paddingBottom = null
    }
  }, [])

  return (
    <div className={styles.loginSignupFooter} ref={loginSignupFooterRef}>
      <Button className={styles.loginButton} variant="transparent" onClick={() => history.push("/login")}>
        Log in
      </Button>
      <Button className={styles.signupButton} variant="light" onClick={() => history.push("/signup")}>
        Sign up
      </Button>
    </div>
  )
}

export default LoginSignupFooter
