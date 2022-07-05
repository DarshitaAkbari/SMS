import React from 'react'

const Update = () => {
  return (
    <>
                    <div className="box">
                        <form method="" action="" name='test_form' onSubmit={(e)=>submit(e)}>
                            <label>SID<span>*</span></label>
                            <input type="text" name='SID' autoComplete='off'  onChange={(e)=>handle(e)} value={data.SID} ></input>
                            <label>Rollno<span>*</span></label>
                            <input type="text" name='Rollno' autoComplete='off' onChange={(e)=>handle(e)} value={data.Rollno}></input>
                            <label>Class<span>*</span></label>
                            <input type="text" name='Class' autoComplete='off'  onChange={(e)=>handle(e)} value={data.Class} ></input>
                            <label>Attendance<span>*</span></label>
                            <select name="presant" onChange={(e)=>handle(e)} value={data[0].Attendance[0].presant}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            <input type="submit" id="sub" class="btn-primary" value="SUBMIT"></input>
                         </form>      
                    </div>
    </>
  )
}

export default Update
