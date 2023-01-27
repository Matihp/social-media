
const Icon = ({size}) => {
  let wid='w-12'
  if(size==='big'){
    wid='w-32'
  }
  return (
    <div className={`${wid} rounded-full overflow-hidden`}>
        <img className="" src="https://contrerasmatias.com/static/media/portf.20e037dbf472837ecadd.jpg"></img>
    </div>
  )
}

export default Icon