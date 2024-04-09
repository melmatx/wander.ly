import Map "mo:map/Map";
import Iter "mo:base/Iter";
import { thash } "mo:map/Map";
import Nat "mo:base/Nat";
import Types "../types";
import Data "data";
import Debug "mo:base/Debug";

module {
  public func initTasks(tasks : Map.Map<Types.Id, Types.TaskWithId>) {
    let sampleTasks = Data.getSampleTasks();

    for (task in Iter.fromArray(sampleTasks)) {
      let currentTask = Map.add(tasks, thash, task.id, task);

      switch (currentTask) {
        case (null) {
          Debug.print("Task " # debug_show (task.id) # " added");
        };
        case (?task) {
          Debug.print("Failed adding task " # debug_show (task.id));
        };
      };
    };
  };

  public func initPosts(posts : Map.Map<Types.Id, Types.PostWithId>) {
    let samplePosts = Data.getSamplePosts();

    for (post in Iter.fromArray(samplePosts)) {
      let currentPost = Map.add(posts, thash, post.id, post);

      switch (currentPost) {
        case (null) {
          Debug.print("Post " # debug_show (post.id) # " added");
        };
        case (?task) {
          Debug.print("Failed adding post " # debug_show (post.id));
        };
      };
    };
  };
};