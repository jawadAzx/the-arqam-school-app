import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableWithoutFeedback, Animated, Vibration, ActivityIndicator, Dimensions
} from 'react-native';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
const { width, height } = Dimensions.get("screen");

const ExpandableCard = ({ expandedCardItems, collapsedCardItems, labelStyle, valueStyle, style, downloadLink }) => {
  const [expandedCard, setExpandedCard] = useState(false);
  const [heightCollapsed, setHeightCollapsed] = useState(0);
  const [heightMaximized, setHeightMaximized] = useState(0);
  const [heightValue] = useState(new Animated.Value(1000));
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(false);

  useEffect(() => {
    heightValue.setValue(heightCollapsed);
  }, [heightCollapsed]);

  useEffect(() => {
    heightValue.setValue(!expandedCard ? heightMaximized : heightCollapsed);
    Animated.spring(heightValue, {
      toValue: expandedCard ? heightMaximized : heightCollapsed
    }).start();
  }, [expandedCard]);
  ///////////////////////////////////////////////////

  const handleDownload = () => {
    setDocument(true);
    setIsLoading(true);
  }

  if (isLoading) {
    return (
      <View style={{ marginTop: height / 3, justifyContent: "flex-start", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <WebView
          source={{ uri: downloadLink }}
        />
      </View>
    )
  }
  setTimeout(() => {
    setIsLoading(false);
    setDocument(false);
  }
    , 5000);

  ///////////////////////////////////////////////////

  const descriptionContainerAnimationStyle = (heightValue !== 0 ? { height: heightValue } : {});

  const _renderInformation = (key, value) => {
    return (
      <View style={styles.labelContainer}>
        <View><Text style={{ ...styles.label, ...labelStyle }}>{key}</Text></View>
        {
          Array.isArray(value) ?
            <View style={{ flex: 1, alignItems: 'center' }}>
              {
                value.map((item, i) => {
                  if (typeof item === 'string') {
                    return <Text key={item} style={{ ...styles.text, textAlign: 'right', ...valueStyle }}>{item}</Text>
                  }
                  else if (React.isValidElement(item)) {
                    return (
                      <View key={i} style={{ width: '100%', alignItems: 'flex-end' }}>
                        {item}
                      </View>

                    );
                  }
                })

              }

            </View>
            :
            React.isValidElement(value) ? <View key={i} style={{ width: '100%', alignItems: 'flex-end' }}> {item} </View>
              : <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...styles.text, ...valueStyle }}>
                  {value}
                </Text>

              </View>

        }

      </View>

    );

  };

  const _renderItems = (items) => {
    return (
      <React.Fragment>
        {
          items.map((item, i) => {
            if (typeof item.label !== 'undefined' && typeof item.value !== 'undefined') {
              return (
                <React.Fragment key={i}>
                  {
                    _renderInformation(item.label, item.value)
                  }
                </React.Fragment>
              );
            }
          })
        }


      </React.Fragment>
    );
  };

  return (
    <View style={{ ...styles.card, ...style }}
    >
      {/* make a download button */}

      {
        heightCollapsed !== 0 && heightMaximized !== 0 ?
          <View>
            <TouchableWithoutFeedback onPress={() => { setExpandedCard(!expandedCard), Vibration.vibrate(50) }}>
              <Animated.View style={[{ overflow: 'hidden' }, descriptionContainerAnimationStyle]}>
                <React.Fragment>
                  {
                    !expandedCard ?
                      <React.Fragment>
                        {
                          _renderItems(collapsedCardItems)
                        }
                        <View
                          style={{ width: '100%', position: 'absolute', bottom: 5 }}
                        >
                          <Text style={{ textAlign: 'center', fontWeight: 'bold', color: "#fff", fontSize: 24 }}>. . .</Text>
                        </View>
                      </React.Fragment>
                      :
                      _renderItems(expandedCardItems)
                  }
                </React.Fragment>
              </Animated.View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name="download" type="font-awesome" color="#fff" size={30} onPress={() => {
                Vibration.vibrate(50)
                // download file from downloadLink
                handleDownload()
              }} />
            </View>
          </View>


          :
          <View>
            <View onLayout={(e) => {
              setHeightCollapsed(e.nativeEvent.layout.height + 30);
            }}>
              {
                _renderItems(collapsedCardItems)
              }
            </View>
            <View style={{ opacity: 0 }} onLayout={(e) => {
              setHeightMaximized(e.nativeEvent.layout.height);
            }}>
              {
                _renderItems(expandedCardItems)
              }
            </View>
          </View>
      }
    </View>
  );
};

const itemsPropType = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.array.isRequired,
    PropTypes.element.isRequired
  ])
}));

ExpandableCard.propTypes = {
  expandedCardItems: itemsPropType,
  collapsedCardItems: itemsPropType,
  labelStyle: PropTypes.object,
  valueStyle: PropTypes.object,
  style: PropTypes.object
};

ExpandableCard.defaultProps = {
  style: { backgroundColor: '#F4F0F6' }
};

const styles = {
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 3,
    backgroundColor: 'black',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5
  },
  label: {
    fontSize: 18,
    color: '#333'
  },
  text: {
    width: '100%',
    fontSize: 18,
    textAlign: 'right',
    marginTop: 1
  }
};

export default ExpandableCard;