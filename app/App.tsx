import * as React from 'react';
import TasksLanding from './TasksLanding';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (    
        <SafeAreaView
            style={{
                flex:1,
                alignItems:'flex-start',
                justifyContent:'center',
                width: "100%",
                height: "100%"
            }}
        >
            <TasksLanding/>
        </SafeAreaView>
    )
}