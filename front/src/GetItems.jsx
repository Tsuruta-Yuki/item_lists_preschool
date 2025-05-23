import { useEffect } from 'react';
import './GetItems.css';

function Getitems(props) {
  async function setDisplayFlag() {
    let response = await fetch(`/items?event=${props.eventlist}`);

    response = await response.json();

    for (const item of response) {
      if (!props.itemlists.includes(item['持ち物'])) {
        props.itemlists.push(item['持ち物']);
      }
    }

    props.setdispfalg(true);
  }

  return (
    <button className="enterbuton" onClick={setDisplayFlag}>
      クリックして今日の持ち物を表示
    </button>
  );
}

export default Getitems;
