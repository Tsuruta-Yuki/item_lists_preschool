import { useEffect } from 'react';

function Getitems(props) {
  async function setDisplayFlag() {
    let response = await fetch(
      `http://localhost:3000/items?event=${props.eventlist}`
    );

    response = await response.json();

    for (const item of response) {
      props.itemlists.push(item['持ち物']);
    }

    props.setdispfalg(true);
  }

  return (
    <button onClick={setDisplayFlag}>クリックして今日の持ち物を表示</button>
  );
}

export default Getitems;
