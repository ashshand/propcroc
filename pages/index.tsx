import Layout from '../components/Layout'


export default function Index() {
  return (
    <>
    <Layout>

      <div className="container px-2 md:px-2 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/4 lg:1/2 mx-auto py-4 text-center justify-center rounded-lg bg-brand-700 bg-opacity-50">
          <div className="grid grid-cols-4 grid-rows-2 mx-2 md:mx-12 gap-x-2">
              <div className="row-start-1 row-span-1 col-span-4"> 
                  <h4 className="my-1 md:my-4 md:text-2xl font-semibold md:mx-auto">
                    PropCroc: real estate data for buyers
                  </h4>
              </div>             
         </div>
       </div>
   
     </div>




    </Layout>

    </>
  
  )
  
}
