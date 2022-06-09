import React  from 'react';
import TagItem from './TagItem';
import ITagItem from '../interfaces/ITagItem';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

const TagList = () => {
const tagsList = ["Blockchain", "Cryptomonnaie"];

  // We gather idPackage to build our call 
  // const {idPackage} 

  // // We define a table to receive tags list from our API
  // const [tagsList, setTagList] = useState(['blockchain']);
  // const getTagsList = () => {
  //   axios
  //     .get(`http://localhost:3000/api/packages/:${idPackage}/categories`)
  //     .then((res) => res.data.results)
  //     .then((data) => {
  //       setTagList(data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getTagsList();
  // },[]);

  return (
    <div>
      {tagsList && tagsList.map((text) => <TagItem {...text} />)}
    </div>
  );
};

export default TagList;
