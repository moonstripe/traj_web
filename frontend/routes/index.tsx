import { Head } from "$fresh/runtime.ts";
import MainIsland from "../islands/MainIsland.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Missile Trajectories</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl">Missile Trajectory Calculator</h1>
        <h4 class="pl-4 text-lg font-italic">by <a class="text-blue-600 font-not-italic" href={"https://ferencdv.github.io/"}>Ferenc Dalnoki-Veress</a> and <a class="text-blue-600 font-not-italic" href={"https://kojinglick.com/"}>Kojin Glick</a></h4>
        <h4><a class="pl-4 text-lg font-italic" href={"https://nonproliferation.org/"}>Center for Nonproliferation Studies</a></h4>
        <MainIsland/>
      </div>
    </>
  );
}
