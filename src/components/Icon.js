
const Icon = ({size,url}) => {
  let wid='w-12'
  if(size==='big'){
    wid='w-32'
  }
  return (
    <div className={`${wid} rounded-full overflow-hidden`}>
        <img className="" src={url}></img>
    </div>
  )
}

export default Icon