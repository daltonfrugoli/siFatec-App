import React, { useEffect } from "react";

import {
    SafeAreaView,
    View,
    Image,
    ImageBackground,
    Text,
    StatusBar
} from 'react-native';

import { db } from "../../App";
import { setHeaderAuth } from "../../services/Https";

export function SplashScreen({ navigation, route }){

    useEffect(() => {
        const createTables = () => {
            db.transaction((tx) => {
                // Cria tabela se não existir
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS logged_user (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        token TEXT
                    );`,
                    [],
                    (tx2, results) => {
                        tx2.executeSql(
                            'SELECT * FROM logged_user;',
                            [],
                            (tx, results) => {
                              if(results.rows.length > 0){
                                  console.log('EXISTE um usuario logado!')
                                  console.log(results.rows.raw()[0].token);
                                  setHeaderAuth(results.rows.raw()[0].token);
                                  navigation.replace('Home');
                              } else {
                                navigation.replace('Login');
                              }
                            },
                            (tx, error) => {
                              console.log('Erro ao consultar:', error);
                            }
                          );
                    },
                    (_, error) => {
                        console.log('Erro ao criar tabela:', error);
                    }
                )
            })
        }
        
        createTables();
    }, [])
    

    // useEffect(() => {
    //     //setTimeout(() => navigation.replace('Login'), 500);
    //     const checkLogin = () => {
    //         db.transaction((tx) => {
    //             // tx.executeSql(
    //             //   'INSERT INTO test_table (nome) VALUES (?);',
    //             //   ['Teste callback'],
    //             //   () => console.log('Inserção feita com sucesso'),
    //             //   (tx, error) => {
    //             //     console.log('Erro ao inserir:', error);
    //             //   }
    //             // );
        
    //             // tx.executeSql(
    //             //   'SELECT * FROM logged_user;',
    //             //   [],
    //             //   (tx, results) => {
    //             //     if(results.rows.length > 0){
    //             //         console.log('EXISTE um usuario logado!')
    //             //     } else {
    //             //         console.log('NÃO EXISTE usuario logado!')
    //             //     }
    //             //   },
    //             //   (tx, error) => {
    //             //     console.log('Erro ao consultar:', error);
    //             //   }
    //             // );
    //         });
    //     }

    //     checkLogin();
    // }, [])

    const backgroundImage = require('../../assets/homeImage.png');
    const logotipo = require('../../assets/cpsIcon.png');

    return(
        <SafeAreaView style = {{ flex: 1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <ImageBackground 
                source = { backgroundImage }
                resizeMode = "cover"
                style = {{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style = {{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image source = { logotipo }/>
                </View>
            </ImageBackground>     
        </SafeAreaView>
    )
}