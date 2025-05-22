import { useState } from 'react';

function AddItems() {
  const [addfalg, setaddfalg] = useState(false);
  const sendinfo = {};
  let itemKey = '';
  let itemName = '';

  function formflag() {
    setaddfalg(true);
  }

  function setEvent(e) {
    itemKey = e.target.value;
  }

  function setItem(e) {
    itemName = e.target.value;
  }

  async function sendItem() {
    if (itemKey === '' || itemName === '') {
      return 'Error:情報が入力されていません';
    } else {
      sendinfo[itemKey] = itemName;
      console.log('💀 ~ sendItem ~ sendinfo:', sendinfo);

      await fetch('/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendinfo),
      });
    }
  }

  return (
    <>
      {addfalg ? (
        <div>
          <p>
            以下にイベントと持ち物を入力してください <br />
            ※普段の持ち物の場合はイベントに「通常」と入力ください
          </p>
          <input onChange={setEvent} placeholder="イベント名を入力" />
          <input onChange={setItem} placeholder="持ち物を入力" /> <br />
          <button onClick={sendItem}>入力完了後にクリック</button>
        </div>
      ) : (
        <button onClick={formflag}>持ち物の追加はこちら</button>
      )}
    </>
  );
}

export default AddItems;
