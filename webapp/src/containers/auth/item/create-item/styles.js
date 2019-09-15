const styles = theme => ({
 
   textField: {
        marginBottom: theme.spacing.unit
    },
    rightPaper: {
        paddingTop: theme.spacing.unit*4,
        paddingLeft: theme.spacing.unit*6,
        paddingRight: theme.spacing.unit*6,
        paddingBottom: theme.spacing.unit*4
    },
    title: {
        fontWeight: '400',
        fontSize: '22px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    description: {
        fontWeight: 400
    },
    profileImageUploaderContainer: {
        display: 'grid'
    },
    profileImagePlaceholder: {
        height: '100%',
        width: '100%',
        background: '#ccc',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#f6f6f6',
        fontSize: '14px'
    },
    uploadImageButtonFile: {
        position: 'relative',
        width: 'auto',
        display: 'inline-block',
        background: '#e1e1e1',
        padding: '12px 16px',
        borderRadius: '4px',
        '&>img': {
            verticalAlign: '-webkit-baseline-middle'
        },
        '&>span': {
            paddingLeft: '8px',
            fontSize: '12px',
            verticalAlign: 'sub'
        }
    },
    actionContainer: {
        margin: '24px 0 0 0',
        '&>Button': {
            marginRight: '12px'
        }
    },
    cancel: {
        height: '36px',
        width: '36px',
        background: '#eee',
        padding: 0,
        minWidth: '32px',
        borderRadius: 0,
        float: 'right',
        top: '12px',
        right: '4px',
        '&:hover':{
            background: '#ddd'
        }
    }, 
    foodTags: {
          
    }
});

export default styles;
