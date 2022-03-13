export function compare( a , b ) {
    const tableA = a.table_name.toLowerCase();
    const tableB = b.table_name.toLowerCase();

    let comparison = 0;
    if( tableA > tableB ) {
        comparison = 1;
    } else if ( tableA < tableB ) {
        comparison = -1;
    }
    return comparison;
}



// const compare = (a, b) => {
//     const tableA = a.table_name.toLowerCase();
//     const tableB = b.table_name.toLowerCase();
  
//     let comparison = 0;
//     if( tableA > tableB ) {
//       comparison = 1;
//     } else if ( tableA < tableB ) {
//       comparison = -1;
//     }
//     return comparison;
//   }
//   if (tables.length > 0){
//     tables.sort(compare);
//     console.log(tables, "these are the table AFTER the sort")
//   }