import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import DatePicker from "react-datepicker";
import {setHours,setMinutes}from "date-fns";
const CryptoComponent = () => {
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 17)
      );
     
    return (
        <div>
            <Fragment>
                <Breadcrumb title="Crypto" parent="Dashboard" />
                <div className="container-fluid">;
                    <div className="row">
                    
                        <div className="col-sm-12">
                            <div className="card">
                            {/* <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
      dateFormat="MMMM d, yyyy h:mm aa"
    /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    );
};

export default CryptoComponent;