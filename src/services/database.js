// //  Local storage
// import { db } from "../App";

// export const dbTestInsert = () => {
//     db.transaction(tx => {
//         tx.executeSql('INSERT INTO logged_user (token) VALUES (?)', ['teste'])
//     })
// }

// export const dbTestSelect = () => {
//     db.transaction(tx => {
//         tx.executeSql(
//             'SELECT token FROM logged_user LIMIT 1',
//             [],
//             (_, result) => console.log(result.rows._array[0]?.token || null)
//         )
//     })
// }

// export const storeToken = (token) => {
//   db.transaction(tx => {
//     tx.executeSql('DELETE FROM logged_user'); // limpa token antigo
//     tx.executeSql('INSERT INTO logged_user (token) VALUES (?)', [token]);
//   });
// };

// export const getStoredToken = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT token FROM logged_user LIMIT 1',
//         [],
//         (_, result) => resolve(result.rows._array[0]?.token || null),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const removeToken = () => {
//   db.transaction(tx => {
//     tx.executeSql('DELETE FROM logged_user');
//   });
// };
