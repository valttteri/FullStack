const Notification = ({ message, type }) => {
  if (message === null || type === null) {
    return null
  }

  if (type === 'positive') {
    return (
      <div className="goodError">
        {message}
      </div>
    )
  }

  if (type === 'negative') {
    return (
      <div className="badError">
        {message}
      </div>
    )
  }
}

export default Notification