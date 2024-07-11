import PostForm from "@/components/PostForm"
import RecomendedUser from "@/components/RecomendedUser"
import { Divider, Tab, Tabs } from "@nextui-org/react"
import PostList from "./components/PostList"
import FollowingPostList from "./components/FollowingPostList"


const Home = () => {

  return (
    <div className=" h-fit flex gap-2">
      {/* //todo: post column */}
      <div className="w-fit border-r-1 border-divider">
        <PostForm />
        <Divider />
        <Tabs
          fullWidth
          variant="underlined"
          color="primary"
          size="lg"

          classNames={{
            base: 'w-screen md:w-full border-b-1 border-divider',
            tabContent: 'text-default-500 group-data-[selected=true]:font-bold',
            cursor: 'h-1',
            panel: 'w-full p-0',
          }}
        >
          <Tab
            key='general'
            title='For You'
          >
            <div className="sm:w-148 xl:w-164">
              <PostList />
            </div>
          </Tab>
          <Tab
            key='following'
            title='Following'
          >
            <div className="sm:w-148 xl:w-164">
              <FollowingPostList />
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* //todo: recommended users */}
      <div className="hidden lg:block sticky top-0 flex-1 mx-6 h-fit border-divider rounded-lg">
        <RecomendedUser />
      </div>
    </div>

  )
}

export default Home