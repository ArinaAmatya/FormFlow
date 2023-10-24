import '../styles/search.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from '../components/NavBar';
import DataGridDemo from '../components/Datatable.js'; // Replace with the correct path to your data table file.


function SearchPage() {
  return(
    <div>
      <NavBar/>;
      <DataGridDemo />
    </div>
  );
   
}

export default SearchPage;