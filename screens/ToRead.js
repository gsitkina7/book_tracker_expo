import { Text, StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import CurrentlyReading from '../components/CurrentlyReading';
import WantToRead from '../components/WantToRead';
import { useContext } from 'react';
import { WantBooksContext } from '../store/want-books-context';
import { CurrentBooksContext } from '../store/current-books-context';

function ToRead() {
	const toReadCtx = useContext(WantBooksContext);
	const currentCtx = useContext(CurrentBooksContext);
	return <SafeAreaView style={{flex: 1, backgroundColor: GlobalStyles.colors.back}}>
		<View style={styles.current}>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.headings}>Currently Reading</Text>
				<View style={styles.notification}>
					<Text style={styles.counter}>{currentCtx.books.length}</Text>
				</View>
			</View>
			<CurrentlyReading style={styles.current} />
		</View>
		<View style={styles.wants}>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.headings}>Want To Read</Text>
				<View style={styles.notification}>
					<Text style={styles.counter}>{toReadCtx.books.length}</Text>
				</View>
			</View>
			<WantToRead />
		</View>
	</SafeAreaView>;
}

export default ToRead;

const styles = StyleSheet.create({
	headings: {
		fontSize: 26,
		fontWeight: 'bold',
		margin: '3%',
		color: GlobalStyles.colors.dark,
	},
	current: {
		flex: 1,
		height: Dimensions.get('window').height / 2,
	},
	wants: {
		flex: 2,
		height: Dimensions.get('window').height / 2,
	},
	notification: { 
		marginTop: '3%',
		marginLeft: '-2%',
		marginBottom: '3%',
		backgroundColor: GlobalStyles.colors.accent1,
		borderRadius: 20,
		shadowColor: GlobalStyles.colors.dark,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
	counter: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		paddingTop: 3,
		paddingHorizontal: 10,
	}
})