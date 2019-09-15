const drawerWidth = 260;
export const styles = theme => ({
  root: {
    display: "flex",
    position: "relative"
  },
  toolbar: {
    paddingLeft: 0,
    paddingRight: "10px" // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "initial",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    whiteSpace: "initial",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appLoader: {
    marginTop: "3px"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    fontSize: "14px"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100%",
    overflow: "auto",
    marginTop: "64px",
    backgroundColor: "#f8f7fc"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  sidePanelHeader: {
    margin: "20px 15px",
    textAlign: "center"
  },
  appName: {
    fontSize: "35px",
    fontWeight: "500"
  },
  appDescription: {
    fontSize: "16px",
    color: "#ccc"
  },
  floatRight: {
    float: "right"
  },
  menuOpen: {
    color: "#2cbd74",
    fontSize: "35px"
  },
  menuWrapper: {
    backgroundColor: "#f8f7fc",
    marginTop: "7px"
  },
  restaurantAddress: {
    fontSize: "12px",
    color: "#c3c3c3",
    marginTop: "10px"
  },
  markerIcon: {
    marginRight: "5px",
    verticalAlign: "bottom"
  },
  restaurantDetails: {
    margin: "30px 15px"
  },
  ratingWrapper: {
    width: "60px",
    backgroundColor: "#fff",
    padding: "5px",
    borderRadius: "5px",
    position: "absolute",
    bottom: "-13px",
    right: "37%",
    border: "1px solid #ccc",
    textAlign: "center"
  },
  sidePanelWrapper: {
    paddingTop: "30px"
  },
  sidePanelWrapperClosed: {
    paddingTop: 0
  },
  arrowMenuOpen: {
    color: "#2cbd74",
    fontSize: "35px"
  },
  scrollContent: {
    margin: "0 auto",
    height: "100vh",
    paddingBottom: "15px"
  }, 
  pageHeader: {
    fontSize: "26px",
    marginRight: "10px",
    color: "#4b4b4c"
  },
  pageDescription: {
    color: "#bebdbf"
  }
});
