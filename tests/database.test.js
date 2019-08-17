const mockingoose=require('mockingoose').default;
const User=require("../models/user");
const Team=require("../models/team");
const Fixture=require("../models/fixture");


describe('mockingoose', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe('test user', () => {
    it('should validate', async () => {
      const user = new User({
        username: 'user',
      });

      await user.validate();
      expect(user.toObject()).toHaveProperty('role');
      expect(user.toObject()).toHaveProperty('_id');
    });
  });
  it('should lean', async () => {
    mockingoose(User).toReturn([{ username: '2' }]);

    const result = await User.find().lean();
    expect(result[0]).toMatchObject({ username: '2' });
  });

  it('should find', async () => {
    mockingoose(User).toReturn([{ username: '2' }]);

    const result = await User.find()
      .where('username')
      .in([1]);
    expect(result).toHaveLength(1);
    expect(result[0].toObject()).toHaveProperty('_id');
    expect(result[0].toObject()).toHaveProperty('role');
    expect(result[0].toObject()).toMatchObject({ username: '2' });
    expect(result[0]).toBeInstanceOf(User);
  });

  it('should work with function that is not an instance of a function', async () => {
    const returnMock = jest.fn().mockReturnValue({ username: '2' });
    mockingoose(User).toReturn(returnMock, 'findOne');

    const result = await User.findOne();
    expect(result.toObject()).toHaveProperty('_id');
    expect(result.toObject()).toHaveProperty('role');
    expect(result.toObject()).toMatchObject({ username: '2' });
    expect(result).toBeInstanceOf(User);
  });

  it('should work with mockingoose(User)', async () => {
    const returnMock = jest.fn().mockReturnValue({ username: '2' });
    mockingoose(User).toReturn(returnMock, 'findOne');

    const result = await User.findOne();
    expect(result.toObject()).toHaveProperty('_id');
    expect(result.toObject()).toHaveProperty('role');
    expect(result.toObject()).toMatchObject({ username: '2' });
    expect(result).toBeInstanceOf(User);
  });

  it('should find with mockingoose(model) with string', async () => {
    mockingoose(User.modelName).toReturn([{ username: '2' }]);

    const result = await User.find()
      .where('username')
      .in([1]);
    expect(result).toHaveLength(1);
    expect(result[0].toObject()).toHaveProperty('_id');
    expect(result[0].toObject()).toHaveProperty('role');
    expect(result[0].toObject()).toMatchObject({ username: '2' });
    expect(result[0]).toBeInstanceOf(User);
  });

  describe('test team', () => {
    it('should validate', async () => {
      const team = new Team({
        name: 'user',
      });

      await team.validate();
      expect(team.toObject()).toHaveProperty('_id');
    });
  });
  it('should lean', async () => {
    mockingoose(Team).toReturn([{ name: '2' }]);

    const result = await Team.find().lean();
    expect(result[0]).toMatchObject({ name: '2' });
  });

  it('should find', async () => {
    mockingoose(Team).toReturn([{ name: '2' }]);

    const result = await Team.find()
      .where('name')
      .in([1]);
    expect(result).toHaveLength(1);
    expect(result[0].toObject()).toHaveProperty('_id');
    expect(result[0].toObject()).toMatchObject({ name: '2' });
    expect(result[0]).toBeInstanceOf(Team);
  });

  it('should work with function that is not an instance of a function', async () => {
    const returnMock = jest.fn().mockReturnValue({ name: '2' });
    mockingoose(Team).toReturn(returnMock, 'findOne');

    const result = await Team.findOne();
    expect(result.toObject()).toHaveProperty('_id');
    expect(result.toObject()).toMatchObject({ name: '2' });
    expect(result).toBeInstanceOf(Team);
  });

  it('should work with mockingoose(User)', async () => {
    const returnMock = jest.fn().mockReturnValue({ name: '2' });
    mockingoose(Team).toReturn(returnMock, 'findOne');

    const result = await Team.findOne();
    expect(result.toObject()).toHaveProperty('_id');
    expect(result.toObject()).toMatchObject({ name: '2' });
    expect(result).toBeInstanceOf(Team);
  });

  it('should find with mockingoose(model) with string', async () => {
    mockingoose(Team.modelName).toReturn([{ name: '2' }]);

    const result = await Team.find()
      .where('name')
      .in([1]);
    expect(result).toHaveLength(1);
    expect(result[0].toObject()).toHaveProperty('_id');
    expect(result[0].toObject()).toMatchObject({ name: '2' });
    expect(result[0]).toBeInstanceOf(Team);
  });
});
