import RecomendedUser from "@/components/RecomendedUser"
import { Tab, Tabs } from "@nextui-org/react"


const Home = () => {
  return (
    <div className="w-full h-fit flex justify-cente gap-2">
      {/* //todo: post column */}
      <div className="w-fit border-x-1 border-divider">
        <Tabs
          fullWidth
          variant="underlined"
          color="primary"
          size="lg"

          classNames={{
            tabContent: 'group-data-[selected=true]:text-white group-data-[selected=true]:font-bold',
            cursor: 'h-1',
            panel: 'w-full p-0',
          }}
        >
          <Tab
            key='general'
            title='For You'
          >
            <div className="w-full sm:w-148 xl:w-[41rem] bg-[red]">a
              {/* <img src="https://t4.ftcdn.net/jpg/05/76/88/79/360_F_576887930_eAKbG9gP0xa0D8a60KYWxWw6IXOmQqGi.jpg" alt="" /> */}
            </div>
          </Tab>
          <Tab
            key='following'
            title='Following'
          >
            <div className="w-full sm:w-148 xl:w-[41rem] bg-[silver]">as</div>
          </Tab>
        </Tabs>
        <div className="w-full sm:w-148 h-screen">a</div>
      </div>

      {/* //todo: recommended users */}
      <div className="hidden lg:block flex-1 mx-6 h-fit border border-divider rounded-lg">
        <RecomendedUser />
      </div>
    </div>

  )
}

export default Home