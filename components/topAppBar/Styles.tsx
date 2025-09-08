import { StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a0dd6',
    padding: 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap:12,
    height:81,
  },
  name: {
    color:"white",
    fontSize:28
  },
  avatar:{
    width:50,
    height:50,
    backgroundColor:"white",
    borderRadius:100,
    alignItems: 'center',
    justifyContent:'center'
  }
})