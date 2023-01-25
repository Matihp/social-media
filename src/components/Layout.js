import NavigationCard from './NavigationCard'

const Layout = ({children}) => {
  return (
    <div className='flex max-w-4xl mt-4 mx-auto gap-6'>
        <div className='w-3/12'>
          <NavigationCard/>
        </div>
        <div className='w-9/12'>
          {children}
        </div>
      </div>
  )
}

export default Layout