import { useState } from 'react';
import Getitems from './GetItems';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import AddItems from './AddItems';

function App() {
  const [dispfalg, setdispfalg] = useState(false);
  const [itemlists, setitemlists] = useState([]);
  const [eventlist, seteventlist] = useState([]);

  function checklist(e) {
    const choise = e.target.value;

    if (e.target.checked) {
      eventlist.push(choise);
    } else {
      const temp = eventlist.filter((item) => item !== choise);

      eventlist.length = 0;
      for (const event of temp) {
        eventlist.push(event);
      }
    }
  }

  return (
    <>
      <h1>幼稚園持ち物リスト</h1>
      {dispfalg ? (
        <div className="card">
          今日の持ち物はこちらです。
          <ul>
            {itemlists.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card">
          今日のイベントを選択してください! <br />
          ※イベントがない日は何も選択しなくてOKです
          <table border="1">
            <tbody>
              <tr>
                <th>選択</th>
                <th>イベント</th>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" value="体育" onChange={checklist} />
                </td>
                <td>体育</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" value="遠足" onChange={checklist} />
                </td>
                <td>遠足</td>
              </tr>
            </tbody>
          </table>
          <Getitems
            setdispfalg={setdispfalg}
            setitemlists={setitemlists}
            itemlists={itemlists}
            eventlist={eventlist}
          />
          <br />
          <AddItems />
        </div>
      )}
    </>
  );
}

export default App;
