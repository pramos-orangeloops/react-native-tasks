import * as React from 'react';
import TasksLanding from '../src/components/tasks/TasksLanding';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../src/context/ThemeContextProvider';

export default function App() {
    const theme = React.useContext(ThemeContext)

    return (
        <SafeAreaView
            style={{
                flex:1,
                alignItems:'flex-start',
                justifyContent:'center',
                width: "100%",
                height: "100%",
                backgroundColor: theme.backgroundColor
            }}
        >
            <TasksLanding/>
        </SafeAreaView>
    )
}