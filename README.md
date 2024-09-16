# Rudderstack x Braze
In order to implement successfully Braze, unfortunally we can't move forward without implementing directly Braze SDK `@braze/react-native-sdk`. It because Rudderstack wrapper does not contains the entire implementation of Braze itself yet. Let's divide the Braze implementation in three main parts to fully understand the problem that we are facing on:
1. Events and Attributes -> It would be 
