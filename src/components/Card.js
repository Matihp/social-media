
export default function Card({children,noPadding}) {
  let styles="bg-white shadow-md shadow-gray-300 rounded-md mb-5"
  if(!noPadding){
    styles += "p-4"
  }
  return (
    <div className={styles}>
        {children}
    </div>
  )
}
