import React, { useState, useEffect, Fragment } from 'react';
import { GetCountries } from '../Services/Service'

const ListComponent = () => {
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(true);

  const GetData = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await GetCountries({ signal: signal })
      .then((response) => {
        const newData = response?.map((value) => ({
          "id": value?.id,
          "name": value?.name,
          "iso2": value?.iso2,
          "flag": `https://flagcdn.com/w20/${value?.iso2?.toLowerCase()}.png`
        }))
        setDatas(newData)
      })
      .catch((error) => {
        if (error?.response) {
          console.log('response error', error?.response?.data)
        } else if (error.request) {
          console.log('request error', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log('error', error.config);
      })
      .finally(() => {
        setLoader(false)
      })
    controller.abort()
  }

  useEffect(() => {
    GetData();
  }, []);

  if (loader) {
    return (
      <div style={{ height: '100vh', backgroundColor: "#FFFFFF", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>Loading ...</h3>
      </div>
    )
  }
  if (!datas?.length) {
    return (
      <div style={{ height: '100vh', backgroundColor: "#FFFFFF", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>NO DATA FOUND</h3>
      </div>
    )
  }

  return (
    <Fragment>
      <div style={{ height: 10 }} />
      {datas?.map((value, index) => (
        <div
          key={index}
          style={{ backgroundColor: '#f5f9ff', elevation: 6, padding: 10, borderRadius: 10, maxWidth: 1040, margin: '10px auto', boxShadow:'initial' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 100 }}>
              <img alt='' src={value?.flag} resizeMode='contain' style={{ width: '100%', height: '100%', borderRadius: '100%' }} />
            </div>
            <div style={{ paddingLeft: 15 }}>
              <h3 style={{ color: '#000000', fontSize: 18, fontWeight: 700, lineHeight: 0.1 }}>{value?.id}</h3>
              <h3 style={{ color: '#000000', fontSize: 18, fontWeight: 700, lineHeight: 0.1 }}>{value?.name}</h3>
              <h5 style={{ color: '#000000', fontSize: 16, fontWeight: 500, lineHeight: 0.1 }}>{value?.iso2}</h5>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default ListComponent