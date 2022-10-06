const topics = {}
const hOP = topics.hasOwnProperty

export default {
  events: {
    MSG_ERROR: "MSG_ERROR",
    MSG_SUCCESS: "MSG_SUCCESS",
    SHOW_LOAD_ANIMATION: "SHOW_LOAD_ANIMATION",
    HIDE_LOAD_ANIMATION: "HIDE_LOAD_ANIMATION",
    REDIRECT: "REDIRECT",
  },

  publish(topic, info) {
    if (!hOP.call(topics, topic)) return

    topics[topic].forEach(function (item) {
      item(info != undefined ? info : {})
    })
  },

  subscribe(topic, listener) {
    if (!hOP.call(topics, topic)) topics[topic] = []

    const index = topics[topic].push(listener) - 1

    return {
      remove() {
        delete topics[topic][index]
      },
    }
  },
}

