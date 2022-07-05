import React from 'react'
import SchoolIcon from '@mui/icons-material/School';
// import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Dashborad/card.css'
const Card = (props) => {
    return (
        <>
                <div className='col-md-4 col-sm-6'>
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                            <div className='cicon'>
                                <SchoolIcon className="sericon"></SchoolIcon>
                            </div>
                            <div className="data">
                                <p className="card-category">student</p>
                                <h3 className="card-title">{props.fee}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-sm-6'>
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                            <div className='cicon'>
                                <SchoolIcon className="sericon"></SchoolIcon>
                            </div>
                            <div className="data">
                                <p className="card-category">student</p>
                                <h3 className="card-title">{props.stud}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 col-sm-6'>
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                            <div className='cicon'>
                                <SchoolIcon className="sericon"></SchoolIcon>
                            </div>
                            <div className="data">
                                <p className="card-category">student</p>
                                <h3 className="card-title">{props.fee}/{props.stud}</h3>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Card
