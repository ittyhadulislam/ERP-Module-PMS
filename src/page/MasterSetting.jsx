import React from "react";
import MasterCard from "../components/MasterSetting/MasterCard";

const MasterSetting = () => {
  const dataArray = [
    {
      id: 1,
      name: "Item 1",
      icon: <i className="nav-icon fas fa-tachometer-alt icon-size"></i>,
    },
    {
      id: 2,
      name: "Item 2",
      icon: <i className="nav-icon fas fa-cog icon-size"></i>,
    },
    {
      id: 3,
      name: "Item 3",
      icon: <i className="nav-icon fas fa-envelope icon-size"></i>,
    },
    {
      id: 4,
      name: "Item 4",
      icon: <i className="nav-icon fas fa-users icon-size"></i>,
    },
    {
      id: 5,
      name: "Item 5",
      icon: <i className="nav-icon fas fa-calendar-alt icon-size"></i>,
    },
    {
      id: 6,
      name: "Item 6",
      icon: <i className="nav-icon fas fa-file-alt icon-size"></i>,
    },
    {
      id: 7,
      name: "Item 7",
      icon: <i className="nav-icon fas fa-chart-bar icon-size"></i>,
    },
    {
      id: 8,
      name: "Item 8",
      icon: <i className="nav-icon fas fa-bell icon-size"></i>,
    },
    {
      id: 9,
      name: "Item 9",
      icon: <i className="nav-icon fas fa-comment icon-size"></i>,
    },
    {
      id: 10,
      name: "Item 10",
      icon: <i className="nav-icon fas fa-tasks icon-size"></i>,
    },
    {
      id: 11,
      name: "Item 11",
      icon: <i className="nav-icon fas fa-users icon-size"></i>,
    },
    {
      id: 12,
      name: "Item 12",
      icon: <i className="nav-icon fas fa-box icon-size"></i>,
    },
    {
      id: 13,
      name: "Item 13",
      icon: <i className="nav-icon fas fa-credit-card icon-size"></i>,
    },
    {
      id: 14,
      name: "Item 14",
      icon: <i className="nav-icon fas fa-tachometer-alt icon-size"></i>,
    },
    {
      id: 15,
      name: " sign-out-alt 15",
      icon: <i className="nav-icon fas fa-sign-out-alt icon-size"></i>,
    },
  ];

  return (
    // <Grid p={5} container spacing={2}>
    //     {dataArray.map(item => (<Card key={item.id} item={item} />))}
    // </Grid>

    <div className=" my-5">
      <div className="row justify-content-center m-0 p-0">
        {/* {myArray.map(e => <Card key={e} />)
                } */}

        {dataArray.map((item) => (
          <MasterCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MasterSetting;
