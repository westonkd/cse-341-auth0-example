const ScripturesController = require("../scriptures.controller");
const mongoose = require("mongoose");

let req, res, send;

beforeEach(() => {
  send = jest.fn();

  req = {};
  res = {
    status: jest.fn(() => ({ send })),
    json: jest.fn(),
  };
});

describe("index()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      ScripturesController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      ScripturesController.index(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });

  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        identifier: "testUser",
      };
    });

    describe("when the user has no scriptures", () => {
      beforeEach(() => {
        req.user.favoriteScriptures = [];
      });

      it("responds with 200", () => {
        ScripturesController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with an empty array", () => {
        ScripturesController.index(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
      });
    });

    describe("when the user has scriptures", () => {
      beforeEach(() => {
        req.user.favoriteScriptures = [
          {
            book: "Ether",
            chapter: "Twelve",
            verses: [27],
          },
          {
            book: "D&C",
            chapter: "Section 10",
            verses: [5],
          },
        ];
      });

      it("responds with 200", () => {
        ScripturesController.index(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with the favorite scriptures", () => {
        ScripturesController.index(req, res);

        expect(res.json).toHaveBeenCalledWith([
          {
            book: "Ether",
            chapter: "Twelve",
            verses: [27],
          },
          {
            book: "D&C",
            chapter: "Section 10",
            verses: [5],
          },
        ]);
      });
    });
  });
});

describe("create()", () => {
  describe("when there is no user present", () => {
    beforeEach(() => (req.user = undefined));

    it("responds with 401", () => {
      ScripturesController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it("responds with 'Not Authenticated'", () => {
      ScripturesController.create(req, res);

      expect(send).toHaveBeenCalledWith("Not Authenticated");
    });
  });

  describe("when there is a user present", () => {
    beforeEach(() => {
      req.user = {
        favoriteScriptures: [],
        save: jest.fn(async () => true),
      };
    });

    describe("when the scripture is valid", () => {
      beforeEach(() => {
        req.body = {
          book: "Ether",
          chapter: "Twelve",
          verses: [27],
        };
      });

      it("responds with 200", async () => {
        await ScripturesController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it("responds with the user", async () => {
        await ScripturesController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(req.user);
      });
    });

    describe("when the scripture is invalid", () => {
      beforeEach(() => {
        req.body = {
          book: "Ether",
          chapter: "Twelve",
        };

        req.user.save = jest.fn(async () => {
          throw new mongoose.Error.ValidationError();
        });
      });

      it("responds with 422", async () => {
        await ScripturesController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
      });

      it("responds with the error", async () => {
        await ScripturesController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(
          expect.any(mongoose.Error.ValidationError)
        );
      });
    });

    describe("when there is an error writing to the data store", () => {
      beforeEach(() => {
        req.user.save = jest.fn(async () => {
          throw new Error("Cannot connect to database");
        });
      });

      it("responds with a 500", async () => {
        await ScripturesController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
      });

      it("responds with the error", async () => {
        await ScripturesController.create(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
});
