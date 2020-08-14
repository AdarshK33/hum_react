import React,{Fragment,useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function DateFromEnd(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endtDate, setEndDate] = useState(new Date());
    return (
        <Fragment>
              <form className="form-inline">
                <div className="row">
                  <div className="col-sm-4">
                  <div className="form-group mb-2">
                    <label className="name f-w-600">From Date &nbsp;</label>
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      required
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  </div>
                  <div className="col-sm-4 pl-3">
                  <div className="form-group mb-2">
                    <label className="name f-w-600">To Date&nbsp; </label>
                    <DatePicker
                      className="form-control"
                      selected={endtDate}
                      required
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                    </div>
                    <div className="col-sm-4 pt-4">
                    <button className="btn btn-primary mb-2" type="button" onClick={() => { props.sendDate(startDate, endtDate) }}>Submit</button> 
                    </div>
                </div>
                 
                 

                 
                </form>
        </Fragment>
    )
}

export default DateFromEnd;
