export default function commentsCounter (onGag) {
  connection.query('SELECT * FROM comments WHERE on_gag = ?', 
    onGag, 
    function(error, results, fields) {
      if(results){
        const getNbOfComment = [results.length, onGag]
        connection.query('UPDATE gags  SET nb_of_comments = ? WHERE id = ?', 
          getNbOfComment,
          function(error, results, fields) {
            if(error){
              console.log(error)
            }
            if(results){
              console.log("ouais ça marche enfin!")
            }
              }
            )
          }
        }
      )
}