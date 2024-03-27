export const handleKeyPress = (e) => {
  console.log(e)
  var key
  if (window.event) key = window.event.keyCode
  if (key > 31)
    if (key < 128) {
      if (window.event)
        window.event.keyCode =
          ' !"#$%،گ)(×+و-./0123456789:ك,=.؟@ِذ}ىُيلا÷ـ،/’د×؛َءٍف‘{ًْإ~جژچ^_پشذزيثبلاهتنمئدخحضقسفعرصطغظ<|>ّ'.charCodeAt(
            key - 32
          )
    }
}
