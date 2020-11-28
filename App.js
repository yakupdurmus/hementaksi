import React, { useState, createRef, useEffect, Component } from 'react';
import {
  View,
  TouchableOpacity,
  NativeModules,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  Image,

} from 'react-native';

import { SelectableText } from "@astrocoders/react-native-selectable-text";


// import ToastExample from './ToastExample'


const lorem = `Deşifre Bulunuyor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas arcu velit, pretium eu lacinia in, vestibulum id turpis. In sem libero, auctor eu interdum quis, eleifend in dolor. Donec rutrum aliquet felis, et consectetur elit sollicitudin ut. Vivamus et magna mi. Ut tristique, arcu nec eleifend efficitur, ipsum elit ornare ligula, vitae vulputate felis dui nec sapien. Etiam facilisis, odio quis congue consectetur, augue metus luctus leo, a ullamcorper nulla erat fermentum metus. In sollicitudin cursus lacus, non commodo sem luctus viverra. Ut massa augue, mattis quis sapien ac, molestie molestie mauris. Sed ac lorem nec dolor volutpat imperdiet. Vestibulum pharetra orci sed ex rutrum, et pretium nibh bibendum. Maecenas nulla nisl, euismod vel mi lacinia, laoreet hendrerit dui.

Praesent a arcu commodo, rutrum ipsum a, consequat lectus. Aenean lacinia lectus purus, a commodo quam viverra in. Quisque eros sapien, congue in gravida eget, rutrum a diam. Fusce varius magna neque, ut pharetra est fringilla quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras a congue enim, eu mattis felis. Sed tincidunt orci libero. Donec luctus, magna luctus auctor dapibus, tellus augue vestibulum dui, at fermentum nisl turpis ac risus.

Praesent luctus felis vel tempus volutpat. Vestibulum at turpis nunc. Vestibulum sit amet diam in sapien aliquet elementum vel ac nibh. Pellentesque pellentesque fermentum dolor vitae ultricies. Proin massa ipsum, eleifend id facilisis non, varius in augue. Etiam a augue justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque mauris eros, elementum at neque quis, vulputate accumsan nunc. Aliquam scelerisque euismod lectus id egestas. Sed nec quam et tortor accumsan cursus. Aliquam erat volutpat. Ut ultrices consequat varius. Donec eu urna ornare, vehicula mauris eu, fringilla tortor. Nunc non interdum nulla. Ut ut urna in metus pretium mollis.

Donec mollis metus nibh. Aliquam tincidunt tristique mauris sed vulputate. Mauris ut vestibulum velit, a consectetur mauris. Praesent rhoncus tortor id ipsum malesuada, sit amet pellentesque libero ultricies. Suspendisse luctus, turpis vel fringilla rutrum, magna turpis rutrum est, et imperdiet magna est et diam. Praesent rutrum eros mi, eget dignissim ipsum mollis vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed urna leo, ultrices vel lorem sed, efficitur vestibulum est. Nulla a ullamcorper diam. Duis vitae tellus nisl. Curabitur sagittis orci ut sollicitudin tincidunt. Donec felis risus, ultrices eget consequat venenatis, fermentum sed mauris. Ut vel imperdiet lacus, sit amet elementum sem. Donec mollis mauris tincidunt, tempus risus nec, vestibulum arcu.

Nunc placerat neque ut purus eleifend tincidunt. Duis dapibus, ex dictum fringilla aliquet, augue orci blandit ligula, eget finibus nibh elit eget massa. In varius laoreet arcu, a elementum quam aliquet sit amet. Sed sagittis ipsum in lacus interdum ultricies. Duis pretium erat ac turpis venenatis tincidunt. Pellentesque rutrum sapien id nunc consequat pulvinar. Maecenas leo justo, euismod non ultricies vel, accumsan ac est. Nam nec sem ut est volutpat maximus ut pulvinar sapien. Vestibulum interdum lacinia lorem non fermentum. Vivamus rutrum congue orci ac consectetur. Etiam sit amet tempor ligula, a dapibus mi. Donec ante magna, sagittis a libero nec, gravida posuere ipsum. Duis mollis nibh sem, ac volutpat nunc eleifend ac. Vivamus non dapibus ex, eu pretium ex.`;
const textProps = [
  {
    value: lorem, highlights: [
      { id: "test", start: 0, end: 18, isTitle: false },
    ]
  },
  { value: lorem, highlights: [{ id: "test", start: 20, end: 50, }] },
  { value: lorem, highlights: [{ id: "test", start: 792, end: 816, textStyle: { fontSize: 40, lineHeight: 40 } }] },
]
const App: () => React$Node = () => {
  let newRef = null
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => {
        console.log("TEST :", newRef);
      }}><Text>asdada</Text></TouchableOpacity>
      <SelectableText
        menuItems={["Foo", "Bar"]}
        /* 
          Called when the user taps in a item of the selection menu:
          - eventType: (string) is the label
          - content: (string) the selected text portion
          - selectionStart: (int) is the start position of the selected text
          - selectionEnd: (int) is the end position of the selected text
         */
        getPosition={(e) => newRef = e}
        onSelection={({ eventType, content, selectionStart, selectionEnd }) => {console.log("TEST :",selectionStart,selectionStart); }}
        value={lorem}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
    flex: 1,
  }

});

export default App;






// import React, { useState } from 'react'
// import { Text, requireNativeComponent, Platform, View, TouchableOpacity } from 'react-native'
// import { v4 } from 'uuid'
// import memoize from 'fast-memoize'

// const RNSelectableText = requireNativeComponent('RNSelectableText')

// /**
//  * numbers: array({start: int, end: int, id: string})
//  */
// const combineHighlights = memoize(numbers => {
//   return numbers
//     .sort((a, b) => a.start - b.start || a.end - b.end)
//     .reduce(function(combined, next) {
//       if (!combined.length || combined[combined.length - 1].end < next.start) combined.push(next)
//       else {
//         var prev = combined.pop()
//         combined.push({
//           start: prev.start,
//           end: Math.max(prev.end, next.end),
//           id: next.id,
//         })
//       }
//       return combined
//     }, [])
// })

// /**
//  * value: string
//  * highlights: array({start: int, end: int, id: any})
//  */
// const mapHighlightsRanges = (value, highlights) => {
//   const combinedHighlights = combineHighlights(highlights)

//   if (combinedHighlights.length === 0) return [{ isHighlight: false, text: value }]

//   const data = [{ isHighlight: false, text: value.slice(0, combinedHighlights[0].start) }]

//   combinedHighlights.forEach(({ start, end }, idx) => {
//     data.push({
//       isHighlight: true,
//       text: value.slice(start, end),
//     })

//     if (combinedHighlights[idx + 1]) {
//       data.push({
//         isHighlight: false,
//         text: value.slice(end, combinedHighlights[idx + 1].start),
//       })
//     }
//   })

//   data.push({
//     isHighlight: false,
//     text: value.slice(combinedHighlights[combinedHighlights.length - 1].end, value.length),
//   })

//   return data.filter(x => x.text)
// }

// /**
//  * Props
//  * ...TextProps
//  * onSelection: ({ content: string, eventType: string, selectionStart: int, selectionEnd: int }) => void
//  * children: ReactNode
//  * highlights: array({ id, start, end })
//  * highlightColor: string
//  * onHighlightPress: string => void
//  * textValueProp: string
//  * TextComponent: ReactNode
//  * textComponentProps: object
//  */
// export const SelectableText = ({ onSelection, onHighlightPress, textValueProp, value, TextComponent, textComponentProps, ...props }) => {

//   //#region 
//   const usesTextComponent = !TextComponent;
//   TextComponent = TextComponent || Text;
//   textValueProp = textValueProp || 'children';  // default to `children` which will render `value` as a child of `TextComponent`
//   const onSelectionNative = ({ nativeEvent: { content, eventType, selectionStart, selectionEnd }, }) => {
//     onSelection && onSelection({ content, eventType, selectionStart, selectionEnd })
//   }

//   const onHighlightPressNative = onHighlightPress
//     ? Platform.OS === 'ios'
//       ? ({ nativeEvent: { clickedRangeStart, clickedRangeEnd } }) => {
//         if (!props.highlights || props.highlights.length === 0) return

//         const mergedHighlights = combineHighlights(props.highlights)

//         const hightlightInRange = mergedHighlights.find(
//           ({ start, end }) => clickedRangeStart >= start - 1 && clickedRangeEnd <= end + 1,
//         )

//         if (hightlightInRange) {
//           onHighlightPress(hightlightInRange.id)
//         }
//       }
//       : onHighlightPress
//     : () => {}

//   // highlights feature is only supported if `TextComponent == Text`
//   let textValue = value;
//   if (usesTextComponent) {
//     textValue = (
//       props.highlights && props.highlights.length > 0
//         ? mapHighlightsRanges(value, props.highlights).map(({ id, isHighlight, text }) => (
//           <Text
//             key={v4()}
//             selectable
//             style={
//               isHighlight
//                 ? {
//                   backgroundColor: props.highlightColor,
//                 }
//                 : {}
//             }
//             onPress={() => {
//               if (isHighlight) {
//                 onHighlightPress && onHighlightPress(id)
//               }
//             }}
//           >
//             {text}
//           </Text>
//         ))
//         : [value]
//     );
//     if (props.appendToChildren) {
//       textValue.push(props.appendToChildren);
//     }
//   }
//   //#endregion
//   const [position, setPosition] = useState({ pageX: 0, pageY: 0 })
//   const [timer, setTimer] = useState(0)
//   return (
//     <View
//       onTouchStart={(e) => {
//         setTimer((new Date).getTime())
//         setPosition({ pageX: -100, pageY: -100 })
//       }}
//       onTouchEnd={(e) => {
//         if (((new Date).getTime() - timer) > 500) {
//           setPosition(e.nativeEvent)
//         }
//       }}>


//       <View style={{ width: 50, height: 50, backgroundColor: 'red', position: 'absolute', zIndex: 999, marginTop: position.pageY, marginLeft: position.pageX }}>
//         <TouchableOpacity onPress={() => {
//           console.log("TEST :", RNSelectableTextManager);
//         }} style={{ flex: 1, backgroundColor: 'blue' }}>

//         </TouchableOpacity>
//       </View>

//       <RNSelectableText
//         {...props}
//         onHighlightPress={onHighlightPressNative}
//         selectable
//         onSelection={onSelectionNative}
//       >
//         <TextComponent
//           key={v4()}
//           {...{[textValueProp]: textValue, ...textComponentProps}}
//         />
//       </RNSelectableText>
//     </View>
//   )
// }
