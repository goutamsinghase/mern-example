export const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh"
  },
  signInWrapper: {
    width: "50%",
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: "5px"
  },
  home: {
    textAlign: "left"
  },
  loginImage: {
    padding: "0 !important",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px"
  },
  signinBox: {
    padding: "0 !important",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px"
  },
  signinBoxPaper: {
    padding: "25px",
    boxShadow: "none"
  },
  formHeader: {
    padding: "42px 0",
    textAlign: "center",
    fontSize: "20px",
    color: "#000"
  },
  formHeaderLogo: {
    padding: "42px 0 0",
    textAlign: "center"
  },
  margin: {
    margin: theme.spacing.unit
  },
  passwordInput: {
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  formFooter: {
    overflow: "hidden",
    paddingTop: "50px",
    height: "80px"
  },
  formFooterLeft: {
    marginTop: "15px"
    // float: "left",
    // paddingLeft: "22px"
  },
  link: {
    textDecoration: "none",
    color: "#2cbd74"
  },
  formFooterRight: {
    width: "100%",
    paddingRight: "10px",
    marginTop: "-16px"
  },
  submit: {
    width: "100%",
    paddingTop: "15px",
    paddingBottom: "15px",
    backgroundColor: "#2cbd74",
    textTransform: "capitalize"
  }
});
