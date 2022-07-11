import { useEffect, useMemo, useState } from 'react';
import { Input } from 'antd';

import { Bike } from '../components';
import { useAppDispatch, useAppSelector } from '../shared/store';
import { fetchBikes } from '../shared/bike.slice';

const Home = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { data, loading, error } = useAppSelector(state => state.bike);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBikes())
  }, [dispatch]);

  const list = useMemo(() => {
    const query = searchText.toLocaleLowerCase().trim();
    return data.filter(({ name, description }) =>
      name.toLocaleLowerCase().includes(query) ||
      description.toLocaleLowerCase().includes(query)
    )
  }, [data, searchText]);

  return (
    <>
      <Input
        placeholder="Search"
        size="large"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      {loading ? (
        <Bike loading />
      ) : list.map(bike => <Bike key={bike.id} bike={bike} isHoverable />)}
      {error && error}
    </>
  );
};

export default Home;