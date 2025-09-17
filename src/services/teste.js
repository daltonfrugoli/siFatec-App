import SQLite from 'react-native-sqlite-storage';

export const testSQLiteCallback = () => {
  const db = SQLite.openDatabase(
    { name: 'test.db', location: 'default' },
    () => {
      console.log('Banco de dados aberto com sucesso');

      db.transaction((tx) => {
        // Cria tabela se não existir
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS test_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT
          );`,
          [],
          () => console.log('Tabela criada/verificada com sucesso'),
          (tx, error) => {
            console.log('Erro ao criar tabela:', error);
          }
        );

        // Insere um valor de teste
        tx.executeSql(
          'INSERT INTO test_table (nome) VALUES (?);',
          ['Teste callback'],
          () => console.log('Inserção feita com sucesso'),
          (tx, error) => {
            console.log('Erro ao inserir:', error);
          }
        );

        // Faz SELECT e exibe os resultados
        tx.executeSql(
          'SELECT * FROM test_table;',
          [],
          (tx, results) => {
            const len = results.rows.length;
            console.log(`Foram encontrados ${len} registros:`);
            for (let i = 0; i < len; i++) {
              console.log(results.rows.item(i));
            }
          },
          (tx, error) => {
            console.log('Erro ao consultar:', error);
          }
        );
      });
    },
    (error) => {
      console.log('Erro ao abrir o banco de dados:', error);
    }
  );
};
