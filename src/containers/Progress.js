import React, { useState } from 'react';
import { View, StyleSheet, Dimensions,ScrollView } from 'react-native'
import { BasicButton, BasicInput, BasicText } from '../components';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";



const cartWidth = Dimensions.get('screen').width - 40
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

//genel #fff  #f7f7f7  #ddd #3e3e3e #000 #f73f40 #e1393a #00b7cd

const Progress = (props) => {

    const [wordCount, setWordCount] = useState(15)
    return (
        <>
            <ScrollView style={styles.containerStyle} >
                <View>
                    <BasicText h1 style={{ color: '#fff' }}>Aylık Öğrenilen Kelime Sayısı</BasicText>
                    <LineChart
                        data={{
                            labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 15 * 30,
                                        Math.random() * 15 * 30,
                                        Math.random() * 15 * 30,
                                        Math.random() * 15 * 30,
                                        Math.random() * 15 * 30,
                                        Math.random() * 15 * 30
                                    ]
                                }
                            ]
                        }}
                        width={cartWidth} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="K"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#f7f7f7",
                            backgroundGradientFrom: "#f7f7f7",
                            backgroundGradientTo: "#ddd",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                padding: 10,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#00b7cd"
                            }
                        }}
                        bezier
                        style={{
                            borderRadius: 16,
                            marginBottom: 20,
                        }}
                    />

                    <BasicText h1 style={{ color: '#fff' }}>Sınavda çıkan kelimelerin % kaçını öğrendim </BasicText>
                    <PieChart
                        data={pieChartData}
                        height={200}
                        width={cartWidth}
                        chartConfig={{
                            backgroundColor: "#000000",
                            backgroundGradientFrom: "#000000",
                            backgroundGradientTo: "#000000",
                            color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
                        }}
                        accessor="population"
                        style={{ backgroundColor: '#f3f3f3', borderRadius: 20, marginBottom: 20 }}
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />

                    <BasicText h1 style={{ color: '#fff' }}>Toplam kaç gelime öğrendim. </BasicText>
                    <View style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                        <BasicText h1>   Toplam <BasicText style={{ fontWeight: 'bold' }}> 3242 </BasicText> kelime </BasicText>
                    </View>
                    <BasicText h1 style={{ color: '#fff' }}>Ulaşmam gereken minimum hedef </BasicText>
                    <View style={{ backgroundColor: '#f3f3f3', padding: 10, borderRadius: 10, marginBottom: 20 }}>
                        <BasicText h1>   En az <BasicText style={{ fontWeight: 'bold' }}> 1242 </BasicText> kelime daha öğrenmelisin.</BasicText>
                    </View>

                </View>
            </ScrollView>

        </>
    )
};

const pieChartData = [
    {
        name: "2019",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "2018",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "2017",
        population: 527612,
        color: "orange",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "2016",
        population: 8538000,
        color: "brown",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "2015",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f73f40',
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },

})

export default React.memo(Progress);