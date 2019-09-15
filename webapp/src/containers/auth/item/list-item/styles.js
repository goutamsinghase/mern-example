const styles = theme => ({
    right: {
        float: "right"
    },
    searchArea: {
        margin: '4px 16px'
    },
    searchButton: {
        float: 'right',
        right: '16px',
        top: '4px',
        padding: '8px 36px',
        textTransform: 'capitalize',
        fontSize: '16px'
    },
    tableHeader: {
        fontSize: '15px',
        fontWeight: 500,
        color: '#000'
    },
    pagination: {
        display: 'inline-block',
        '&>div': {
            color: 'black',
            float: 'left',
            padding: '8px 16px',
            textDecoration: 'none',
            transition: 'background-color .3s',
            border: '1px solid #ddd'
        },
        '&>div.active': {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: '1px solid #4CAF50'
        },
        '&>div:hover:not(.active)': {
            backgroundColor: '#ddd'
        }
    },
    disabled:{
        pointerEvents: 'none',
        opacity: '0.7'
    }
});

export default styles;
