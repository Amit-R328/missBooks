
export class LongTxt extends React.Component {

    get txt() {
        const { text, isLongTxtShown } = this.props
        return (isLongTxtShown) ? text : text.substring(0, 100) + '...'
    
    }


    render() {
        
        return <React.Fragment>
            <p>
                {this.txt}
            </p>
            
        </React.Fragment>
    }

}