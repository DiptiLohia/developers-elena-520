import "./App.css";
import { Layout } from "antd";
import { Map } from "./components/Map";
import { TopHeader } from "./components/TopHeader";
import { SideHeader } from "./components/SideHeader";

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <TopHeader/>
        <Layout>
          <Content>
            <Map />
          </Content>
          <SideHeader/>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
