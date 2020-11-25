import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Dimensions, Button, TextInput, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Todo from './Todo';
import { LineChart } from "react-native-chart-kit";
import moment from 'moment';



const styles = StyleSheet.create({
    input: {
      margin: 20,
      height: 40,
      borderColor: 'red',
      borderWidth: 1, 
      paddingLeft: 10
    },
    titleText: {
      color: 'red'
    },
  });

const Home = ({ navigation }) => {
    const [description, setDescription] = useState('');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format('LL'), amount: 2000 },
    { date: moment().subtract(1, 'days').format('LL'), amount: 2500 },
    { date: moment().subtract(2, 'days').format('LL'), amount: 3500 },
    { date: moment().subtract(3, 'days').format('LL'), amount: 5500 },
    { date: moment().subtract(4, 'days').format('LL'), amount: 6500 },
  ])
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, 'date')));
  }, [data])

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([
    {
      description: 'Freelance Job',
      amount: 499.99,
      timestamp: new Date()
    },
  ]);
  
  const getDates = () =>  transformedData.map(pair => pair.date);
  const getAmounts = () => transformedData.map(pair => pair.amount);
  const transformData = (groupedData) => {
    const transformedArray = [];
    
    Object.entries(groupedData).forEach(entry => {
      const total = entry[1].reduce((total, pair) => total += pair.amount, 0)
      transformedArray.push({ date: moment(entry[0]).format('DD/MM'), amount: total })
    })

    const sortedArray = transformedArray.sort((a, b) => moment(a['date']).diff(moment(b['date'])))
    
    
      return sortedArray;
    
  }
  

  useEffect(() => {
    
  }, [entries])

  useEffect(() => {
   setTotal(entries.reduce((total, entry) => total+Number(entry.amount), 0));
  }, [entries])

  const addEntry = () => {
    setEntries([...entries, {
      description: description,
      amount: amount,
      timestamp: new Date()
    }]);

    setData([
      ...data,
      {
       date: moment().format('LL'),
       amount: Number(amount)
      }
    ]);

    setDescription('');
    setAmount('');
  }


    return (
      <SafeAreaView>
        <View>
          <Text style={styles.titleText}>Open up App.s to start working on your app!</Text>
        </View>
        <Button title='Login' onPress={() => navigation.navigate('Login')}/>
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart 
            data={{
              labels: getDates(),
              datasets: [
                {
                data: getAmounts()
                }
              ]
            }}
            width={Dimensions.get("window").width}
            height={200}
            yAxisLabel=""
            yAxisSuffix="€"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "purple",
              backgroundGradientTo: "black",
              decimalPlaces: null,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "green"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <Text>Total Income: {total}</Text>
        <TextInput
          style={styles.input}
          value={description}
          placeholder='Enter a description'
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          value={amount}
          placeholder='Enter the amount you made in Euros(€)'
          keyboardType='numeric'
          onChangeText={text => setAmount(text)}
        />
        <Button disabled={!amount && !description} title='Add Entry' onPress={addEntry} />

        {entries.map(entry => (
          <View>
            <Text>{entry.description}</Text>
            <Text>{entry.amount}€</Text>
          </View>
        ))}
      </SafeAreaView>
    );
  
}



export default Home;

