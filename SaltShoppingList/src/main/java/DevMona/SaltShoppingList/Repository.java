package DevMona.SaltShoppingList;

import org.springframework.data.mongodb.repository.MongoRepository;

@org.springframework.stereotype.Repository
public interface Repository extends MongoRepository<Shopping, String> {
    Shopping findByTitle(String title);

}
